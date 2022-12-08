import { useState } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [tempoInsertion, setTempoInsertion] = useState([]);
  const [tempoMerge, setTempoMerge] = useState([]);
  const [tamanhoVetor, setTamanhoVetor] = useState([]);
  const [valorM, setValorM] = useState(0);

  function compararNumeros(a, b) {
    return a - b;
  }

  function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
      let j = i - 1;
      let temp = array[i];
      while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = temp;
    }
  }

  function mergeSortRecursivo(array) {
    if (array.length <= 1) {
      return array;
    }

    const meio = Math.floor(array.length / 2);
    const esqArr = array.slice(0, meio);
    const dirArr = array.slice(meio);

    return mergeDoisArrays(
      mergeSortRecursivo(esqArr),
      mergeSortRecursivo(dirArr)
    );
  }

  function mergeDoisArrays(esqArr, dirArr) {
    let resArr = [],
      esqIndex = 0,
      dirIndex = 0;

    while (esqIndex < esqArr.length && dirIndex < dirArr.length) {
      if (esqArr[esqIndex] < dirArr[dirIndex]) {
        resArr.push(esqArr[esqIndex]);
        esqIndex++;
      } else {
        resArr.push(dirArr[dirIndex]);
        dirIndex++;
      }
    }

    if (esqArr[esqIndex]) {
      var elementos = esqArr.slice(esqIndex);
      resArr.push(...elementos);
    } else {
      var elementos = dirArr.slice(dirIndex);
      resArr.push(...elementos);
    }
    return resArr;
  }

  const dataInsertionMerge = {
    labels: tamanhoVetor,
    datasets: [
      {
        label: "Insertion Sort",
        data: tempoInsertion,
        borderColor: "#565969",
        backgroundColor: "#565969",
      },
      {
        label: "Merge Sort",
        data: tempoMerge,
        borderColor: "#5E6BB5",
        backgroundColor: "#5E6BB5",
      },
    ],
  };
  // função que recebe um valor N que é uma posição do array de tamanhos e retorna um array de valores
  function GerarValores(tamVetor) {
    let valVetor = [];
    for (let j = 0; j < tamVetor; j++) {
      valVetor.push(
        parseFloat(
          (
            Math.random() * ((tamVetor *2) - (tamVetor * -2)) + (tamVetor * -2)
          ).toFixed(2)
        )
      );
    }
    return valVetor; //retorna um vetor de tamanho N com N números aleatórios
  }

  function sortTime() {
    let tamVetor = [];
    let mArrays = []; 
    let arrayGeral = [];
    let tempMerge = []
    let tempInsertion = []
    let inicio;
    let final;

    for (let i = 0; i < 10; i++) {
      tamVetor.push(Math.floor(Math.random() * (10000 - 10) + 10)); // gerando valores entre 10000 e 10
    }
    tamVetor.sort(compararNumeros); // ordenando array de tamanhos

    setValorM(Math.floor(Math.random() * (20 - 10) + 10)); //escolhendo um M aleatório entre 10 e 20

    for (let i = 0; i < tamVetor.length; i++) {
      for (let j = 0; j < valorM; j++) { // inserindo no vetor mArrays um array de N valores, ou seja M vetores de n valores
        mArrays.push(GerarValores(tamVetor[i]));
      }
      arrayGeral.push(mArrays); // inserindo num array geral, separando por tamanhos, vou ter 10 entradas com m entradas em cada, esse array separa elas
      mArrays = [];
    }
    
    for (let i = 0; i < arrayGeral.length; i++) { // um FOR que vai verificar o tempo de performance em M vetores de tamanho N
      inicio = performance.now();
      for (let j = 0; j < valorM; j++) {
        insertionSort(arrayGeral[i][j])
      }
      final = performance.now();
      tempInsertion.push(final-inicio)
    }

    for (let i = 0; i < arrayGeral.length; i++) { // um FOR que vai verificar o tempo de performance em M vetores de tamanho N
      inicio = performance.now();
      for (let j = 0; j < valorM; j++) {
        mergeSortRecursivo(arrayGeral[i][j])
      }
      final = performance.now();
      tempMerge.push(final-inicio)
    }

    
    setTempoInsertion(tempInsertion); // Inserindo o tempo do Isertion SORT
    setTempoMerge(tempMerge); // Inserindo o tempo do Merge SORT
    setTamanhoVetor(tamVetor); // Inserindo o tamanho do Vetor
  }

  return (
    <>
      <div style={{ alignItems: "center" }}>
        <button
          onClick={() => sortTime()}
          style={{ background: "red", marginTop: "100px" }}
        >
          Gerar Gráfico
        </button>
        <h1>Insertion Sort vs Merge Sort</h1>
        <div
          style={{
            marginTop: "50px",
            width: "800px",
            height: "500px",
            backgroundColor: "white",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Line
            data={dataInsertionMerge}
            options={{
              maintainAspectRatio: false,
              scales: {},
            }}
          />
        </div>
      </div>
    </>
  );
}
