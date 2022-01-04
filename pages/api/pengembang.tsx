// API for the development, currently not yet implemented

export default function handler(req, res) {
  res.status(200).json({
    greeting:
      "Halo pengembang! Saat ini iDekita belum mengembangkan REST API. Jika kalian ingin berpartisipasi, bisa kunjungi repositori Github iDekita di https://github.com/snowfluke/idekita",
  });
}
