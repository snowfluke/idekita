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
      <div className="container-section">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-section">
            <div className="box-section">
              <div className="wrap-section">
                <div className="mb-3">
                  <h3 className="px-3">Dengan mendaftar berarti Anda menyetujui segala peraturan dan kebijakan yang terdapat di situs iDekita.</h3>
                </div>
                <hr className="my-6" />
                <div className="grid">
                  <h3>Mendaftar menggunakan</h3>
                  <div className="justify-self-center mt-4">
                    <button className="btn-white flex hover:shadow-md hover:bg-gray-50" onClick={signIn}>
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 47 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Social-Icons---Isolated" transform="translate(-389.000000, -727.000000)">
                            <g id="Google" transform="translate(389.000000, 727.000000)">
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
      <section className="w-full py-24">
        <div className="container-section">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-section">
              <div className="box-section">
                <div className="wrap-section">
                  <div className="mb-6">
                    <h3 className="h3-style">Buat Username</h3>
                  </div>
                  <div>
                    <form onSubmit={submitHandler}>
                      <input name="username" className="input-white px-4 py-2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] text-center" placeholder="username" value={valueForm} onChange={changeHandler} />
                      <UsernameMessage username={valueForm} isValid={isValid} loading={loading} />

                      <button type="submit" className="btn-transparent mt-6 hover:text-fuchsia-500 hover:bg-white" disabled={!isValid}>
                        Gunakan
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="mt-2">👨🏻‍💻 Sedang mengecek ...</p>;
  } else if (isValid) {
    return (
      <p className="mt-2">
        <span className="font-semibold">{username}</span> bisa digunakan 👍🏻
      </p>
    );
  } else if (username && !isValid) {
    return <p className="mt-2">Nama pengguna sudah dipakai 😭</p>;
  } else {
    return <p></p>;
  }
}
