import styled from "styled-components";
import { useRecentBookings } from "../bookings/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "../bookings/useConfirmStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    isLoading: isLoadingBookings,
    bookings,
    numDays,
  } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
  const { cabins } = useCabins();

  if (isLoadingBookings && isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
      <div></div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
