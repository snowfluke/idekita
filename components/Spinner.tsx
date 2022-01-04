/** Loading components */
export default function Spinner({ show }) {
  return show ? <div className="spinner text-center">Memuat...</div> : null;
}
