import { Modal } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import styles from "../styles";
import { styles as TStyles } from "../App";
import { getTotal } from "../utils";
import { Invoice } from "../App";

interface IModal {
  displayModal: boolean;
  notPayedInvoices: Invoice[] | undefined;
}

function ModalApp({ displayModal, notPayedInvoices }: IModal) {
  return (
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
      style={styles.modalContainer as TStyles}
    >
      <div style={styles.titleModal as TStyles}>
        Paiement sécurisé par prélèvement bancaire
      </div>
      <div style={styles.subtitleModal as TStyles}>
        Mise en place d'un mandat SEPA MANGOPAY
      </div>
      <form style={styles.formModal as TStyles}>
        <div style={styles.relationLabelInput as TStyles}>
          <label style={styles.labelModal as TStyles}>
            Titulaire du compte
            <span style={styles.requiredStar as TStyles}>*</span>
          </label>
          <input
            value="Soan solutions"
            style={styles.inputModal as TStyles}
          ></input>
        </div>
        <div style={styles.relationLabelInput as TStyles}>
          <label style={styles.labelModal as TStyles}>
            Adresse du titulaire
            <span style={styles.requiredStar as TStyles}>*</span>
          </label>
          <input
            placeholder="Adresse du titulaire"
            style={styles.inputModal as TStyles}
          ></input>
        </div>
        <div style={styles.groupInputsModal as TStyles}>
          <div style={styles.groupInputModal as TStyles}>
            <label style={styles.labelModal as TStyles}>
              Ville<span style={styles.requiredStar as TStyles}>*</span>
            </label>
            <input
              placeholder="Ville"
              style={styles.inputModal as TStyles}
            ></input>
          </div>
          <div style={styles.groupInputModal as TStyles}>
            <label style={styles.labelModal as TStyles}>
              Région<span style={styles.requiredStar as TStyles}>*</span>
            </label>
            <input
              placeholder="Région"
              style={styles.inputModal as TStyles}
            ></input>
          </div>
          <div style={styles.groupInputModal as TStyles}>
            <label style={styles.labelModal as TStyles}>
              Code postal
              <span style={styles.requiredStar as TStyles}>*</span>
            </label>
            <input
              placeholder="Code postal"
              style={styles.inputModal as TStyles}
            ></input>
          </div>
          <div style={styles.groupInputModal as TStyles}>
            <label style={styles.labelModal as TStyles}>
              Pays<span style={styles.requiredStar as TStyles}>*</span>
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                placeholder="France"
                style={Object.assign(
                  { width: "100%" },
                  styles.inputModal as TStyles
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
        <div style={styles.relationLabelInput as TStyles}>
          <label style={styles.labelModal as TStyles}>
            IBAN<span style={styles.requiredStar as TStyles}>*</span>
          </label>
          <input
            style={styles.inputModal as TStyles}
            placeholder="---- ---- ---- ----"
          ></input>
        </div>
      </form>
    </Modal>
  );
}
export default ModalApp;
