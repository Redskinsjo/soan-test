import styles from "../styles";
import { formatDueDate, formatAmount, formatDiscountedAmount } from "../utils";
import { IoIosCheckbox } from "react-icons/io";
import PaymentMethod from "./PaymentMethod";
import { styles as TStyles } from "../App";
import { Invoice } from "../App";

function InvoicePayment({ inv, type }: { inv: Invoice; type: string }) {
  let dueDate = formatDueDate(inv.sentDate, inv.maxDaysToPay);
  const amount = formatAmount(inv.amount);
  let discountedAmount;
  if (inv.discount)
    discountedAmount = formatDiscountedAmount(inv.amount, inv.discount.rate);
  return (
    <div style={styles.notPayedInv as TStyles}>
      {type === "not-payed" && (
        <div style={styles.notPayedInv_1 as TStyles}>
          <IoIosCheckbox style={styles.checkbox as TStyles} />
        </div>
      )}
      <div style={styles.notPayedInv_2 as TStyles}>
        <div style={styles.notPayedInv_2_1 as TStyles}>{inv.invoiceNumber}</div>
        <div style={styles.notPayedInv_2_2 as TStyles}>
          À régler avant le {dueDate}
        </div>
      </div>
      <div style={styles.notPayedInv_3 as TStyles}>
        <PaymentMethod discount={inv.discount} multi={inv.multiPaymentStatus} />
      </div>
      {inv.discount ? (
        <div style={styles.notPayedInv_4 as TStyles}>
          <div style={styles.notPayedInv_4_1 as TStyles}>
            {discountedAmount} €
          </div>
          <div style={styles.notPayedInv_4_2 as TStyles}>{amount}</div>
        </div>
      ) : (
        <div style={styles.notPayedInv_4 as TStyles}>
          <div style={styles.notPayedInv_4_1 as TStyles}>{amount} €</div>
        </div>
      )}
    </div>
  );
}

export default InvoicePayment;
