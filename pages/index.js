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
import { Line } from "react-chartjs-2";

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
  const [tempoRodCutMemoization, setTempoRodCutMemoization] = useState([]);
  const [tempoRodCutIterative, setTempoRodCutIterative] = useState([]);
  const [tamanhoVetor, setTamanhoVetor] = useState([]);

  function compararNumeros(a, b) {
    return a - b;
  }

  //trocar pelas funções

  //rod cut aqui
  function memoRodCut(preco, index, n, dp) {
    if (index == 0) {
      return n * preco[0];
    }
    if (dp[index][n] != -1) {
      return dp[index][n];
    }

    notCut = memoRodCut(preco, index - 1, n, dp);
    rod_length = index + 1;

    if (rod_length <= n) {
      cut = preco[index]
        + memoRodCut(preco, index, n - rod_length,
          dp);
    }

    return dp[index][n] = Math.max(cut, notCut);
  }
  //


  // função que recebe um valor N que é uma posição do array de tamanhos e retorna um array de valores
  function GerarValores(tamVetor) {
    let valVetor = [];
    for (let j = 0; j < tamVetor; j++) {
      valVetor.push(
        Math.floor(Math.random() * (30 - 1) + 1)
      );
    }
    valVetor.sort(compararNumeros);
    return valVetor; //retorna um vetor de tamanho N com N números aleatórios
  }

  function sortTime() {
    let tamVetor = [];
    let arrayGeral = [];
    let tempRodCutIterative = []
    let tempRodCutMemoization = []
    let inicio;
    let final;

    for (let i = 0; i < 10; i++) {
      tamVetor.push(Math.floor(Math.random() * (15 - 5) + 5)); // gerando valores entre 5 e 15, tamanho de vetores
    }
    tamVetor.sort(compararNumeros); // ordenando array de tamanhos

    for (let i = 0; i < tamVetor.length; i++) {
      arrayGeral.push(GerarValores(tamVetor[i])) // gerando valores pro tamanho especifico do array de tamanhos
    }


    console.log(tamVetor)
    console.log(arrayGeral)

    //   for (let i = 0; i < arrayGeral.length; i++) { // um FOR que vai verificar o tempo de performance em M vetores de tamanho N
    //     inicio = performance.now();
    //     for (let j = 0; j < valorM; j++) {
    //       insertionSort(arrayGeral[i][j])
    //     }
    //     final = performance.now();
    //     tempRodCutMemoization.push(final-inicio)
    //   }

    //   for (let i = 0; i < arrayGeral.length; i++) { // um FOR que vai verificar o tempo de performance em M vetores de tamanho N
    //     inicio = performance.now();
    //     for (let j = 0; j < valorM; j++) {
    //       mergeSortRecursivo(arrayGeral[i][j])
    //     }
    //     final = performance.now();
    //     tempRodCutIterative.push(final-inicio)
    //   }

    //   setTempoRodCutMemoization(tempRodCutMemoization); // Inserindo o tempo do Isertion SORT
    //   setTempoRodCutIterative(tempRodCutIterative); // Inserindo o tempo do Merge SORT
    setTamanhoVetor(tamVetor); // Inserindo o tamanho do Vetor
  }

  const dataRodCut = {
    labels: tamanhoVetor,
    datasets: [
      {
        label: "Rod-Cut recursivo com memoização",
        data: tempoRodCutMemoization,
        borderColor: "#565969",
        backgroundColor: "#565969",
      },
      {
        label: "Rod-Cut iterativo",
        data: tempoRodCutIterative,
        borderColor: "#5E6BB5",
        backgroundColor: "#5E6BB5",
      },
    ],
  };

  return (
    <>
      <div style={{ alignItems: "center" }}>
        <button
          onClick={() => sortTime()}
          style={{ background: "red", marginTop: "100px" }}
        >
          Gerar Gráfico
        </button>
        <h1>Rod-Cut recursivo com memoização x Rod-Cut iterativo</h1>
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
            data={dataRodCut}
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
