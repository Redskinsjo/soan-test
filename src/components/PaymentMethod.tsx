import styles from "../styles";
import { BsLightningChargeFill } from "react-icons/bs";
import { styles as TStyles } from "../App";

interface IPaymentMethod {
  discount: { rate: number; maxDaysToPay: number } | null;
  multi: "USED" | "AVAILABLE" | "NONE";
}

function PaymentMethod({ discount, multi }: IPaymentMethod) {
  return (
    <>
      {discount ? (
        <div style={styles.notPayedInv_3 as TStyles}>
          <div style={styles.notPayedInv_3_1 as TStyles}>
            <BsLightningChargeFill />
            <span style={{ color: "black", marginLeft: 6 }}>Escompte</span>
          </div>
          <div
            style={styles.notPayedInv_3_2 as TStyles}
          >{`-${discount.rate}% pendant ${discount.maxDaysToPay} jours`}</div>
        </div>
      ) : multi === "USED" && !discount ? (
        <div style={styles.notPayedInv_3 as TStyles}>
          <div style={styles.notPayedInv_3_1 as TStyles}>
            <BsLightningChargeFill />
            <span style={{ color: "black", marginLeft: 6 }}>3x sans frais</span>
          </div>
          <div style={styles.notPayedInv_3_2 as TStyles}>Appliqué</div>
        </div>
      ) : multi === "AVAILABLE" && !discount ? (
        <div style={styles.notPayedInv_3 as TStyles}>
          <div style={styles.notPayedInv_3_1 as TStyles}>
            <BsLightningChargeFill />
            <span style={{ color: "black", marginLeft: 6 }}>3x sans frais</span>
          </div>
          <div style={styles.notPayedInv_3_2 as TStyles}>Disponible</div>
        </div>
      ) : null}
    </>
  );
}

export default PaymentMethod;
