import { useState } from "react";
import "./App.css";

const penyakitData = {
  "CONTRACT ULCERS": [3, 16],
  "ABAES PARAFARINGEAL": [3, 19],
  "ABAES PERITONAILER": [1, 2, 7, 14, 16, 22],
  "BAROTITIS MEDIA": [2, 6],
  "DEVIASI SEPTUM": [1, 5, 6, 15, 25, 29],
  FARINGITIS: [1, 3, 7, 13, 14],
  "KANKER LARING": [3, 4, 7, 13, 16, 23, 24],
  "KANKER LEHER DAN KEPALA": [3, 12, 15, 21, 30, 31],
  "KANKER LEHER METASTATIK": [12],
  "KANKER NASOFARING": [5, 15],
  "KANKER TONSIL": [7, 12],
  LARINGITIS: [1, 3, 14, 19, 37],
  "NEURONITIS VESTIBULARIS": [10, 17],
  OSTEOSKLEROSIS: [20, 35],
  "OTITIS MEDIA AKUT": [1, 6, 10, 32],
  MENIERE: [6, 10, 34, 36],
  TONSILITIS: [1, 2, 3, 4, 7, 10],
  "TUMOR SYARAF PENDENGARAN": [2, 20, 38],
  "VERTIGO POSTULAR": [17],
  "SINUSITIS MAKSILARIS": [1, 2, 4, 5, 8, 9, 11, 28, 33],
  "SINUSITIS FRONTALIS": [1, 2, 4, 5, 8, 9, 11, 18],
  "SINUSITIS ETMOIDALIS": [1, 2, 4, 5, 8, 9, 11, 18, 26, 27],
  "SINUSITIS SFENOIDALIS": [1, 2, 4, 5, 6, 8, 9, 11, 12],
  PERUT: [1, 2, 3, 4],
};

const gejalaList = {
  1: "demam",
  2: "sakit kepala",
  3: "nyeri saat bicara atau menelan",
  4: "batuk",
  5: "hidung tersumbat",
  6: "nyeri telinga",
  7: "nyeri tenggorokan",
  8: "hidung meler",
  9: "letih dan lesu",
  10: "mual dan muntah",
  11: "selaput lendir merah dan bengkak",
  12: "ada benjolan di leher",
  13: "nyeri leher",
  14: "pembengkakan kelenjar getah bening",
  15: "pendarahan hidung",
  16: "suara serak",
  17: "bola mata bergerak tanpa sadar",
  18: "dahi sakit",
  19: "leher bengkak",
  20: "tuli",
  21: "ada yang tumbuh di mulut",
  22: "air liur menetes",
  23: "berat badan turun",
  24: "bunyi nafas abnormal",
  25: "infeksi sinus",
  26: "nyeri antara mata",
  27: "nyeri pinggir hidung",
  28: "nyeri pipi di bawah mata",
  29: "nyeri wajah",
  30: "perubahan kulit",
  31: "perubahan suara",
  32: "radang gendang telinga",
  33: "sakit gigi",
  34: "serangan vertigo",
  35: "telinga berdenging",
  36: "telinga terasa penuh",
  37: "tenggorokan gatal",
  38: "tubuh tak seimbang",
};

function App() {
  const [selectedGejala, setSelectedGejala] = useState([]);
  const [hasil, setHasil] = useState([]);

  const handleCheckboxChange = (kode) => {
    setSelectedGejala((prev) =>
      prev.includes(kode) ? prev.filter((id) => id !== kode) : [...prev, kode]
    );
  };

  const deteksiPenyakit = () => {
    const hasilDeteksi = Object.entries(penyakitData)
      .map(([nama, gejala]) => {
        const cocok = gejala.filter((g) => selectedGejala.includes(g));
        return { nama, totalCocok: cocok.length, totalGejala: gejala.length };
      })
      .filter((item) => item.totalCocok > 0)
      .sort((a, b) => b.totalCocok - a.totalCocok);

    setHasil(hasilDeteksi.slice(0, 1));
  };

  return (
    <div className="app-wrapper">
      <div className="app-box">
        <h4 className="title">Deteksi Penyakit Berdasarkan Gejala</h4>
        <p><strong>Pilih Gejala Anda:</strong></p>
        <div className="gejala-list">
          {Object.entries(gejalaList).map(([kode, nama]) => (
            <div key={kode} className="gejala-item">
              <input
                type="checkbox"
                id={`gejala-${kode}`}
                checked={selectedGejala.includes(Number(kode))}
                onChange={() => handleCheckboxChange(Number(kode))}
              />
              <label htmlFor={`gejala-${kode}`}>{nama}</label>
            </div>
          ))}
        </div>
        <button onClick={deteksiPenyakit}>Deteksi Penyakit</button>
        <div className="hasil-box">
          <strong>Hasil Deteksi:</strong><br />
          {hasil.length === 0 ? (
            <span className="text-muted">Tidak ada penyakit terdeteksi.</span>
          ) : (
            <span>Kemungkinan: {hasil[0].nama}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
