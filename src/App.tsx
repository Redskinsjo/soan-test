import { useState, useEffect } from "react";
import "./App.less";
import { Tabs, Modal } from "antd";
import styles from "./styles";
import axios from "axios";
import InvoicePayment from "./components/InvoicePayment";
import { formatAmount } from "./utils";
import { v4 as id } from "uuid";
import { GiPadlock } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";

const { TabPane } = Tabs;

type Error = {
  type: "no-data";
};

export type styles = {
  [key: string]: any;
};

export type Invoice = {
  payedDate: null | string;
  invoiceNumber: string;
  sentDate: string;
  maxDaysToPay: number;
  amount: string;
  discount: {
    rate: number;
    maxDaysToPay: number;
  };
  multiPaymentStatus: "USED" | "AVAILABLE" | "NONE";
};

interface IServerData {
  status: string;
  payments: Invoice[];
}

function App() {
  const [payedInvoices, setPayedInvoices] = useState<Invoice[] | undefined>();
  const [notPayedInvoices, setNotPayedInvoices] = useState<
    Invoice[] | undefined
  >();
  const [error, setError] = useState<Error | undefined>();
  const [displayModal, setDisplayModal] = useState<boolean | undefined>();

  // get invoices or set error in case
  const fetchData = async () => {
    const result = await axios.get<IServerData>(
      "https://test.soan-solutions.io/test_front/datas"
    );
    if (result.status === 200) {
      const { data } = result;
      const { status, payments } = data;
      if (status === "success") {
        const payed = [];
        const notPayed = [];
        for (let i = 0; i < payments.length; i++) {
          if (payments[i].payedDate) payed.push(payments[i]);
          else notPayed.push(payments[i]);
        }
        setPayedInvoices(payed);
        setNotPayedInvoices(notPayed);
      } else {
        setError({ type: "no-data" });
      }
    } else {
      setError({ type: "no-data" });
    }
  };

  // one side-effect on mounting
  useEffect(() => {
    fetchData();
  }, []);

  const getTotal = (arr: any[]) => {
    const amount = arr.reduce((acc, curr) => {
      let total = acc;
      if (curr.payedDate) return total;
      if (curr.discount) {
        total +=
          Number(curr.amount) -
          Number(curr.amount) * (curr.discount.rate / 100);
      } else {
        total += Number(curr.amount);
      }
      return total;
    }, 0);
    return formatAmount(String(amount));
  };

  return (
    <div className="app">
      {!error && displayModal && (
        <div
          style={styles.modalPage as styles}
          onClick={() => setDisplayModal(!displayModal)}
        >
          <Modal
            cancelText="Annuler"
            okText={`Payer ${notPayedInvoices && getTotal(notPayedInvoices)} €`}
            visible={displayModal}
            closeIcon={
              <MdOutlineClose
                fontSize="22px"
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  color: "black",
                }}
              />
            }
            style={styles.modalContainer as styles}
          >
            <div style={styles.titleModal as styles}>
              Paiement sécurisé par prélèvement bancaire
            </div>
            <div style={styles.subtitleModal as styles}>
              Mise en place d'un mandat SEPA MANGOPAY
            </div>
            <form style={styles.formModal as styles}>
              <div style={styles.relationLabelInput as styles}>
                <label style={styles.labelModal as styles}>
                  Titulaire du compte
                  <span style={styles.requiredStar as styles}>*</span>
                </label>
                <input
                  value="Soan solutions"
                  style={styles.inputModal as styles}
                ></input>
              </div>
              <div style={styles.relationLabelInput as styles}>
                <label style={styles.labelModal as styles}>
                  Adresse du titulaire
                  <span style={styles.requiredStar as styles}>*</span>
                </label>
                <input
                  placeholder="Adresse du titulaire"
                  style={styles.inputModal as styles}
                ></input>
              </div>
              <div style={styles.groupInputsModal as styles}>
                <div style={styles.groupInputModal as styles}>
                  <label style={styles.labelModal as styles}>
                    Ville<span style={styles.requiredStar as styles}>*</span>
                  </label>
                  <input
                    placeholder="Ville"
                    style={styles.inputModal as styles}
                  ></input>
                </div>
                <div style={styles.groupInputModal as styles}>
                  <label style={styles.labelModal as styles}>
                    Région<span style={styles.requiredStar as styles}>*</span>
                  </label>
                  <input
                    placeholder="Région"
                    style={styles.inputModal as styles}
                  ></input>
                </div>
                <div style={styles.groupInputModal as styles}>
                  <label style={styles.labelModal as styles}>
                    Code postal
                    <span style={styles.requiredStar as styles}>*</span>
                  </label>
                  <input
                    placeholder="Code postal"
                    style={styles.inputModal as styles}
                  ></input>
                </div>
                <div style={styles.groupInputModal as styles}>
                  <label style={styles.labelModal as styles}>
                    Pays<span style={styles.requiredStar as styles}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      placeholder="France"
                      style={Object.assign(
                        { width: "100%" },
                        styles.inputModal as styles
                      )}
                    ></input>
                    <TiArrowSortedDown
                      style={{
                        position: "absolute",
                        right: 5,
                        top: 22,
                        zIndex: 20,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={styles.relationLabelInput as styles}>
                <label style={styles.labelModal as styles}>
                  IBAN<span style={styles.requiredStar as styles}>*</span>
                </label>
                <input
                  style={styles.inputModal as styles}
                  placeholder="---- ---- ---- ----"
                ></input>
              </div>
            </form>
          </Modal>
          {/* <div style={styles.modalContainer as styles}></div> */}
        </div>
      )}

      {!error && (
        <div style={styles.appContent as styles}>
          <div className="container">
            <Tabs type="card" style={styles.tabsContainer as styles}>
              <TabPane
                tab="Factures à payer"
                style={styles.firstTabContent as styles}
                key="1"
              >
                {notPayedInvoices?.map((inv) => (
                  <InvoicePayment key={id()} inv={inv} type="not-payed" />
                ))}
                <div style={styles.payment as styles}>
                  <button
                    style={styles.paymentButton as styles}
                    className="paymentButton"
                    onClick={() => setDisplayModal(true)}
                  >
                    Payer {notPayedInvoices && getTotal(notPayedInvoices)} €
                  </button>
                </div>
              </TabPane>
              <TabPane tab="Factures payées" key="2">
                {payedInvoices?.map((inv) => (
                  <InvoicePayment key={id()} inv={inv} type="payed" />
                ))}
              </TabPane>
            </Tabs>
          </div>
          <div style={styles.adContainer as styles}>
            <GiPadlock fontSize="14px" />
            <span style={styles.ad as styles}>
              Paiement en ligne 100% sécurisé
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
