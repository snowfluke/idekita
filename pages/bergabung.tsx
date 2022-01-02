import { useContext, useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "@modules/contexter";
import { doc, db, writeBatch, serverTimestamp } from "@modules/firebaser";
import { signIn, isValidUsername, isUsernameAvailable, signOut } from "@modules/helper";
import { useRouter } from "next/router";
import { Meta } from "@modules/composer"

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
      notifications: [{ msg: "Selamat bergabung di iDekita!", read: false }],
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

  return (
    <>
    <Meta
        title="Bergabung 🤝🏻 Bersama dengan iDekita"
        description="Bergabung bersama kami sebagai Idekiawan, mengumpulkan semua ide-ide dan solusi kreatif demi masa depan yang lebih baik lagi"
      />
      {user ? (
        username ? (
          <ThankYou />
        ) : (
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
      ) : (
        <CreateUser />
      )}
    </>
  );
}

function CreateUser() {
  return (
    <section className="w-full py-14">
      <div className="container-section">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-section">
            <div className="box-section">
              <div className="wrap-section">
                <div className="mb-3">
                  <h3 className="px-0 md:px-3">Dengan mendaftar berarti Anda menyetujui segala peraturan dan kebijakan yang terdapat di situs iDekita.</h3>
                </div>
                <hr className="my-6" />
                <div className="grid">
                  <h3>Mendaftar menggunakan</h3>
                  <div className="justify-self-center mt-4">
                    <button className="btn-white flex hover:shadow-md hover:bg-gray-50" onClick={signIn}>
                      <img src="google-logo.png" className="w-6 h-6 mr-2" />
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
  );
}

function ThankYou() {
  const router = useRouter();
  return (
    <section className="w-full py-14">
      <div className="prose text-center mx-auto pb-10">
        <p className="text-4xl">😎</p>
        <h1>Terima kasih telah bergabung menjadi bagian dari Idekita </h1>        
      </div>
      <div className="flex justify-center">
          <p className="btn-section" onClick={() => router.push("/langit-ide")}>
            Mulai Eksplorasi
          </p>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <p className="btn-section" onClick={() => router.back()}>
            Kembali
          </p>
          <p className="btn-section" onClick={() => signOut(router)}>
            Keluar
          </p>
        </div>  
    </section>
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
