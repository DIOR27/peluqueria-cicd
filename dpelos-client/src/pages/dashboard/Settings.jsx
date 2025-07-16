import { useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Calendar, Users, Save } from "lucide-react";
import { Formik, Form } from "formik";
import FormInput from "../../components/ui/FormInput";
import * as Yup from "yup";
import WorkingHoursField from "../../components/dashboard/settings/WorkingHoursField";
import useSettingsStore from "../../stores/settingsStore";

const businessSchema = Yup.object({
  name: Yup.string().required("El nombre del negocio es requerido"),
  address: Yup.string().required("La dirección es requerida"),
  phone: Yup.string()
    .required("El teléfono es requerido")
    .matches(/^\d+$/, "Formato de teléfono inválido"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
});

export default function Settings() {
  const {
    getBusinessInformation,
    setBusinessInformation,
    updateBusinessInformation,
    setWorkingHours,
    workingHours,
    getWorkingHours,
  } = useSettingsStore();

  const businessInformation = useSettingsStore(state => state.businessInformation);

  const businessInitialValues = {
    name: businessInformation?.nombre || '',
    address: businessInformation?.direccion || '',
    phone: businessInformation?.telefono || '',
    email: businessInformation?.email || '',
  };

  const workingHoursInitialValues = { ...workingHours };

  const workingHoursSchema = Yup.object().shape(
    Object.keys(workingHoursInitialValues).reduce((acc, day) => {
      acc[day] = Yup.object({
        hora_inicio: Yup.string().required("La hora de apertura es requerida"),
        hora_fin: Yup.string().required("La hora de cierre es requerida"),
        activo: Yup.boolean().required(),
      });
      return acc;
    }, {})
  );

  const handleSubmitBusinessInformation = async (values, { setSubmitting }) => {
    if (businessInformation?.id) {
      await updateBusinessInformation({ id: businessInformation.id, ...values });
    } else {
      await setBusinessInformation(values);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    getBusinessInformation();
    getWorkingHours();
  }, [getBusinessInformation, getWorkingHours]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>

      <Formik
        initialValues={businessInitialValues}
        validationSchema={businessSchema}
        onSubmit={handleSubmitBusinessInformation}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-gold-500" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Información del Negocio
                    </h2>
                  </div>
                  <Button type="submit" disabled={isSubmitting} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
                <div className="space-y-4">
                  <FormInput
                    label="Nombre del Negocio"
                    name="name"
                    placeholder="Nombre del Negocio"
                  />
                  <FormInput
                    label="Dirección"
                    name="address"
                    placeholder="Dirección"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Teléfono"
                      name="phone"
                      placeholder="Teléfono"
                    />
                    <FormInput
                      label="Email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={workingHoursInitialValues}
        validationSchema={workingHoursSchema}
        onSubmit={(values, { setSubmitting }) => {
          setWorkingHours(values);
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-gold-500" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Horario de Trabajo
                    </h2>
                  </div>
                  <Button type="submit" disabled={isSubmitting} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>

                <div className="space-y-4">
                  {Object.keys(values).map((day) => (
                    <WorkingHoursField
                      key={day}
                      day={day}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}
