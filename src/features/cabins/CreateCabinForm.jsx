import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created.");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: () => {
      toast.error("Cabin could not be created.");
    },
  });
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited.");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: () => {
      toast.Error("Cabin could not be edited.");
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label="Name">
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="text"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="text"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          type="text"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              getValues().regularPrice > value ||
              "Discount should be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description">
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
