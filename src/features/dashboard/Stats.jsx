import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays + cabinCount);

  return (
    <>
      <Stat
        value={numBookings}
        title="Total bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
      />
      <Stat
        value={formatCurrency(sales)}
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        value={checkins}
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />
      <Stat
        value={`${Math.round(occupancyRate) * 100}%`}
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
      />
    </>
  );
}

export default Stats;
