import { Button } from "../../ui/Button";
import { Formik, Form, Field } from "formik";
import FormInput from "../../ui/FormInput";
import FormStatusToggle from "../../ui/FormStatusToggle";
import * as Yup from "yup";
import useServiceStore from "../../../stores/serviceStore";

export default function NewService({ handleClose }) {
  const { createService } = useServiceStore();

  const initialValues = {
    name: "",
    description: "",
    duration: "",
    price: "",
    isActive: true,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    duration: Yup.number()
      .required("La duración es requerida")
      .positive("La duración debe ser positiva"),
    price: Yup.number()
      .required("El precio es requerido")
      .positive("El precio debe ser positivo"),
    isActive: Yup.boolean().required("El estado es requerido"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    createService(values);
    setSubmitting(false);
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput
              label="Nombre"
              name="name"
              placeholder="Nombre del servicio"
            />
            <FormInput
              label="Descripción"
              name="description"
              placeholder="Descripción del servicio"
              as="textarea"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Duración (minutos)"
                name="duration"
                type="number"
                placeholder="Duración del servicio"
              />
              <FormInput
                label="Precio"
                name="price"
                type="number"
                placeholder="Precio del servicio"
              />
            </div>
            <div className="mb-4">
              <Field name="isActive" component={FormStatusToggle} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
