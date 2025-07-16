import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import dpelosn from "../assets/dpelosn.svg";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormPasswordInput from "../components/ui/FormPasswordInput";
import FormInput from "../components/ui/FormInput";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("La confirmación de contraseña es requerida"),
});

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    console.log(values);
    setSubmitting(false);
  }, 3000);
};

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-500 mb-4 gap-2"
        to="/"
      >
        <ArrowLeft className="w-5" />
        Regresar a página de inicio
      </Link>

      <Image
        src={dpelosn}
        alt="Logo D'Pelos"
        className="mb-4"
        width={128}
        height={30}
        priority
      />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
          <p className="text-gray-600 mt-2">
            Ingresa tus datos para registrarte
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormInput
                label="Correo Electrónico"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
              />
              <FormPasswordInput
                label="Contraseña"
                name="password"
                placeholder="••••••••"
                id="password"
              />
              <FormPasswordInput
                label="Repetir Contraseña"
                name="confirmPassword"
                placeholder="••••••••"
                id="confirmPassword"
              />

              <div>
                <Button
                  className="w-full"
                  type="subtmit"
                  disabled={isSubmitting}
                >
                  Crear Cuenta
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <Link
              to="/ingresar"
              className="font-medium text-gold-600 hover:text-gold-500 ml-2"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
