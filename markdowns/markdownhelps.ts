const markdownhelps = `

# Paragraf
Untuk membuat paragraf teks biasa tidak diperlukan tanda apapun.

**Contoh penggunaan**: Ini teks biasa


# Heading
Gunakan tanda **#** untuk membuat teks heading atau judul, lalu tambahkan spasi sebelum menambahkan teks. Semakin banyak jumlah pagar (maksimal 5) maka akan semakin kecil ukuran teks judulnya.

**Contoh penggunaan**:

**# H1**
# H1

**## H2**
## H2

**### H3**
### H3


# Cetak Tebal
Sisipkan tanda ** di antara teks yang ingin dicetak tebal.

**Contoh penggunaan**: Ini teks \\\**tebal**

Ini teks **tebal**


# Cetak Miring
Sisipkan tanda * atau _ di antara teks yang ingin dicetak miring.

**Contoh penggunaan**: Ini teks \\\_miring_

Ini teks _miring_


# Blockquote
Untuk membuat blockquote gunakan tanda > lalu spasi sebelum menambahkan teks.

**Contoh penggunaan**: > Ini contoh blockquote

> Ini contoh blockquote


# List
Untuk membuat ordered list cukup gunakan angka. Sedangkan untuk membuat unordered list gunakan tanda * atau - dan jangan lupa pisahkan dengan spasi sebelum menambahkan teks. Untuk membuat sublist cukup tambahkan spasi atau tab seperti contoh berikut.

**Contoh penggunaan**:
1. Contoh ordered list 1

    \\\- Contoh sublist
2. Contoh ordered list 2

    \\\* Contoh unordered list


# Tautan
Untuk membuat tautan terdiri dari dua bagian sintaks yang harus diisi yaitu anchor text dan alamat tautan. Untuk membuat anchor text gunakan tanda kurung bracket untuk mengapit teks [teks]. Lalu untuk alamat tautan gunakan tanda kurung untuk mengapit alamat tautan (https://google.com)

**Contoh penggunaan**:

\\\[Situs Google](https://google.com)

Hasil: [Situs Google](https://google.com)

# Gambar
Sama seperti tautan, gambar terdiri dari dua bagian sintaks yaitu alternate text dan alamat sumber gambar. Apit alternate text menggunakan tanda kurung bracket ditambah dengan tanda seru didepan ![teks gambar]. Untuk alamat sumber gambar apit dnegan tanda kurung (https://raw.githubusercontent.com/snowfluke/idekita/main/public/hero.png)

**Contoh penggunaan**:

\\\![iDekita]\\\(https://raw.githubusercontent.com/snowfluke/idekita/main/public/hero.png)

Hasil:
![iDekita](https://raw.githubusercontent.com/snowfluke/idekita/main/public/hero.png)
`;

export { markdownhelps };
