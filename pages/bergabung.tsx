import { useContext, useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "@modules/context";
import { doc, db, writeBatch, serverTimestamp } from "@modules/firebase";
import { signIn, isValidUsername, isUsernameAvailable } from "@modules/helper";

export default function Register() {
  const [valueForm, setValueForm] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  const changeHandler = (event) => {
    const val = event.target.value.toLowerCase();

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setValueForm(val);
      setLoading(false);
      setIsValid(false);
    }

    if (isValidUsername(val)) {
      setValueForm(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length > 3) {
        let result = await isUsernameAvailable(username);
        setIsValid(result);
        setLoading(false);
      }
    }, 1000),
    []
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    // Create refs for both documents
    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", valueForm);

    // Commit both docs together as a batch write.
    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: valueForm,
      photoURL: user.photoURL,
      dateJoined: serverTimestamp(),
      email: user.email,
      notifications: ["Selamat bergabung di iDekita!"],
      reports: 0,
      title: {
        special: "Nakama",
      },
      uid: user.uid,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  };

  useEffect(() => {
    checkUsername(valueForm);
  }, [valueForm]);

  return !user ? (
    <section className="w-full py-14">
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-1/2 px-4 mt-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-fuchsia-500 border-0">
              <div className="rounded-t mb-0 px-6 py-10 text-white text-center">
                <div className="mb-3">
                  <h6>
                    Dengan mendaftar berarti Anda menyetujui segala peraturan
                    dan kebijakan yang terdapat di situs iDekita.
                  </h6>
                </div>
                <hr className="my-6" />
                <div className="grid">
                  <h6>Mendaftar menggunakan</h6>
                  <div className="justify-self-center mt-4">
                    <button
                      className="bg-white text-gray-700 px-6 py-2 flex rounded outline-none shadow hover:shadow-md transition ease-in-out duration-300 hover:bg-gray-50"
                      onClick={signIn}
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        viewBox="0 0 47 48"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Social-Icons---Isolated"
                            transform="translate(-389.000000, -727.000000)"
                          >
                            <g
                              id="Google"
                              transform="translate(389.000000, 727.000000)"
                            >
                              <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                id="Fill-1"
                                fill="#FBBC05"
                              ></path>
                              <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                id="Fill-2"
                                fill="#EA4335"
                              ></path>
                              <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                id="Fill-3"
                                fill="#34A853"
                              ></path>
                              <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                id="Fill-4"
                                fill="#4285F4"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    !username && (
      <section className="my-8 pt-14">
        <h3>Choose Username</h3>
        <form onSubmit={submitHandler}>
          <input
            name="username"
            placeholder="myname"
            value={valueForm}
            onChange={changeHandler}
          />
          <UsernameMessage
            username={valueForm}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Gunakan
          </button>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Mengecek...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} bisa digunakan</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">Nama pengguna sudah dipakai</p>;
  } else {
    return <p></p>;
  }
}
