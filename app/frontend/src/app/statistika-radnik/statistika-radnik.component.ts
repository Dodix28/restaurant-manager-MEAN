
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-statistika-radnik',
  templateUrl: './statistika-radnik.component.html',
  styleUrls: ['./statistika-radnik.component.css']
})
export class StatistikaRadnikComponent implements OnInit{

  constructor(){}

  chart: any;

  ngOnInit(): void {
    this.drawGuestsPerDayChart();
    this.drawGuestsPerWaiterChart();
    this.drawAvgReservationsPerDayOfWeekChart();
  }

  drawGuestsPerDayChart(): void {
    const ctx = document.getElementById('guestsPerDayChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'],
        datasets: [{
          label: 'Broj gostiju',
          data: [15, 20, 18, 25, 30, 28, 22],
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Boja barova
          borderColor: 'rgba(54, 162, 235, 1)', // Boja ivice barova
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  drawGuestsPerWaiterChart(): void {
    const ctx = document.getElementById('guestsPerWaiterChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Konobar A', 'Konobar B', 'Konobar C', 'Konobar D'],
        datasets: [{
          label: 'Raspodela gostiju medju konobarima',
          data: [30, 20, 15, 35],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
              }
            }
          }
        }
      }
    });
  }

  drawAvgReservationsPerDayOfWeekChart(): void {
    const ctx = document.getElementById('avgReservationsPerDayOfWeekChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar', // Koristimo barovski dijagram za histogram
      data: {
        labels: ['PONEDELJAK', 'UTORAK', 'SREDA', 'CETRVTAK', 'PETAK', 'SUBOTA', 'NEDELJA'],
        datasets: [{
          label: 'Prosecan broj rezervacija u proteklih 24meseca | po danima u nedelji ',
          data: [5, 6, 7, 8, 9, 8, 7],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Prosecan broj rezervacija'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Dani u nedelji '
            }
          }
        }
      }
    });
  }

}
