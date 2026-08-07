import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),

    onSuccess: () => {
      toast.success(`Booking deletes successfully.`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => {
      toast.error(`There was an error deleting the booking.`);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
