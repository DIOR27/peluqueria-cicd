import { Button } from "../../ui/Button";
import { Formik, Form, Field } from "formik";
import FormInput from "../../ui/FormInput";
import * as Yup from "yup";
import FormServicesCheckbox from "./FormServicesCheckbox";
import FormStatusToggle from "../../ui/FormStatusToggle";
import useSpecialistStore from "../../../stores/specialistStore";
import useServiceStore from "../../../stores/serviceStore";


export default function NewSpecialist({ handleClose }) {
  const { createSpecialist } = useSpecialistStore();
  const { services } = useServiceStore();

  const initialValues = {
    name: "",
    lastname: "",
    position: "",
    bio: "",
    isActive: true,
    services: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    lastname: Yup.string().required("El apellido es requerido"),
    position: Yup.string().required("La especialidad es requerido"),
    bio: Yup.string().required("La biografía es requerida"),
    isActive: Yup.boolean().required("El estado es requerido"),
    services: Yup.array()
      .of(Yup.string())
      .min(1, "Debes seleccionar al menos un servicio")
      .required("Los servicios son requeridos"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    await createSpecialist(values);
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
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="flex gap-4">
              <FormInput
                label="Nombre"
                name="name"
                placeholder="Nombre del especialista"
              />
              <FormInput
                label="Apellido"
                name="lastname"
                placeholder="Apellido del especialista"
              />
            </div>
            <FormInput
              label="Especialidad"
              name="position"
              placeholder="Especialidad del especialista"
            />
            <FormInput
              label="Biografía"
              name="bio"
              placeholder="Biografía del especialista"
              as="textarea"
              rows={3}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Servicios
              </label>
              <Field
                name="services"
                component={FormServicesCheckbox}
                services={services}
              />
              {touched.services && errors.services && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.services}
                </div>
              )}
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
