import { useParams } from "react-router";
import useContacts from "../hooks/useContacts";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function EditContact() {
  const { email } = useParams();
  const navigate = useNavigate();

  const { getContact, updateContact, createContact } = useContacts();

  let contact = null;

  if(email){
    contact = getContact(email);
  }
  useEffect(() => {
      if(email && !contact){
          navigate("/")
      }
  }, [])
//   if(typeof contact === 'undefined'){
//       navigate("/");
//   }

  return (
    <div className="flex w-full flex-col min-h-screen bg-gray-100 items-center p-10">
      <div className="flex max-w-xl flex-col w-full">
        <h1 className="text-4xl font-bold mb-4">{ contact ? "Editar" : "Crear"} contacto</h1>
        <div className="flex bg-white rounded-lg p-4 w-full">
          <Formik
            initialValues={{
              image: contact ? contact.picture.thumbnail : '',
              firstName: contact ? contact.name.first : '',
              lastName: contact ? contact.name.last : '',
              email: contact ? contact.email : '',
              telefono: contact ? contact.phone : '',
            }}
            validationSchema={Yup.object().shape({
            image: Yup.string().required("La imagen es obligatoria").url(),
              firstName: Yup.string().required("El nombre es obligatorio"),
              lastName: Yup.string().required("El apellido es obligatorio"),
              email: Yup.string().email().required("El email es obligatorio"),
              telefono: Yup.string().required("El telefono es obligatorio"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                if(contact){
                    updateContact(contact, values);
                }
                else{
                    createContact(values);
                }
                navigate("/");
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label
                  className="mb-2 mt-2 font-medium ds-font-body-medium text-gray-700"
                  htmlFor="image"
                >
                  Imagen
                </label>
                <div className="flex mb-2 py-2">
                <img className="rounded-full mr-4" src={values.image} alt="" />
                <input
                  type="text"
                  id="image"
                  name="image"
                  className={`${
                    errors.image && touched.image && "ring-red-700 ring-2"
                  } transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 mt-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                </div>
                {errors.image && touched.image && (
                  <div className="p-2 text-sm text-red-700">
                    {" "}
                    {errors.image}{" "}
                  </div>
                )}
                <label
                  className="mb-2 mt-2 font-medium ds-font-body-medium text-gray-700"
                  htmlFor="firstName"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`${
                    errors.firstName && touched.firstName && "ring-red-700 ring-2"
                  } transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 mt-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <div className="p-2 text-sm text-red-700">
                    {" "}
                    {errors.firstName}{" "}
                  </div>
                )}
                <label
                  className="mb-2 mt-2 font-medium ds-font-body-medium text-gray-700"
                  htmlFor="lastName"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`${
                    errors.lastName && touched.lastName && "ring-red-700 ring-2"
                  } transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 mt-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                  <div className="p-2 text-sm text-red-700">
                    {" "}
                    {errors.lastName}{" "}
                  </div>
                )}

<label
                  className="mb-2 mt-2 font-medium ds-font-body-medium text-gray-700"
                  htmlFor="telefono"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className={`${
                    errors.telefono && touched.telefono && "ring-red-700 ring-2"
                  } transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 mt-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                  value={values.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.telefono && touched.telefono && (
                  <div className="p-2 text-sm text-red-700">
                    {" "}
                    {errors.telefono}{" "}
                  </div>
                )}

<label
                  className="mb-2 mt-2 font-medium ds-font-body-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`${
                    errors.email && touched.email && "ring-red-700 ring-2"
                  } transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 mt-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="p-2 text-sm text-red-700">
                    {" "}
                    {errors.email}{" "}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-5 border border-yellow-500 transition ease-in-out text-gray-700 font-semibold h-12 rounded-lg hover:-translate-y-1 hover:scale-99"
                >
                  { contact ? 'Guardar' : 'Crear contacto' }
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EditContact;
