import { useState, useEffect } from "react";
import "./App.less";
import { Tabs } from "antd";
import styles from "./styles";
import axios from "axios";
import InvoicePayment from "./components/InvoicePayment";
import { v4 as id } from "uuid";
import { GiPadlock } from "react-icons/gi";
import ModalApp from "./components/Modal";
import { getTotal } from "./utils";
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
  const [loading, setLoading] = useState<boolean | undefined>(true);

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
        setLoading(false);
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

  return (
    <div className="app">
      {!error && displayModal && (
        <div
          style={styles.modalPage as styles}
          onClick={() => setDisplayModal(!displayModal)}
        >
          <ModalApp
            displayModal={displayModal}
            notPayedInvoices={notPayedInvoices}
          />
        </div>
      )}

      {!error && !loading && (
        <div style={styles.appContent as styles}>
          <div className="container">
            <Tabs
              type="card"
              style={styles.tabsContainer as styles}
              onTabClick={(key: string) => console.log(key)}
            >
              <TabPane tab="Factures à payer" key="1">
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
