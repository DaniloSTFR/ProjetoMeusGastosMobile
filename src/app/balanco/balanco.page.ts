import { Component, AfterViewInit, ViewChild , ElementRef } from '@angular/core';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);

@Component({
  selector: 'app-balanco',
  templateUrl: './balanco.page.html',
  styleUrls: ['./balanco.page.scss'],
})
export class BalancoPage implements AfterViewInit {
  @ViewChild('barChart') barChart;
  @ViewChild('doughnutCanvas')  doughnutCanvas;
  @ViewChild('lineCanvas')  lineCanvas;

  bars: any;
  doughnutChart: any;
  lineChart: any;
  colorArray: any;
  constructor() { }

  ngAfterViewInit() {
  }

  ionViewDidEnter() {
    this.createBarChart();
    this.doughnutChartMethod();
    this.lineChartMethod();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Escola', 'Energia', 'Gasolina', 'Internet','Água', 'Outros'],
        datasets: [{
          label: '# por Valor',
          data: [750, 450, 350, 158, 125, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
    });
  }


  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Dinheiro', 'Cartão Crédito', 'Cartão Débito', 'Boleto', 'Outros'],
        datasets: [{
          label: '# por tipo PG',
          data: [500, 350, 1050, 650, 125],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Gastos por mês',
            fill: false,
            tension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 100,
            data: [3500, 2800, 2750, 3000, 4505, 3850, 5050, 4105, 3489, 3254, 4895, 5354],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
