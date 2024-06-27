import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  
} from "ng-apexcharts";
import { HttpClient } from '@angular/common/http';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;

  title: ApexTitleSubtitle;
  colors:any;
 plotOptions: ApexPlotOptions;

};

interface Choice {
  choice_id: number;
  choice_text: string;
  choice_count: number;
}

interface Question {
  choice_text: string | undefined;
  question_id: number;
  question_text: string;
  contain_choices: number;
  choices: Choice[];
}


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit{
  
  jsonData: Question[] = [];
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: ChartOptions = {
    series: [
      
    ],
    chart: {   
      height: 350,
      type: "bar"
    }, 
    title: {
      text: "Question Choices Chart"
    },
   
      
    xaxis:{
      categories : []
    
    },
   colors:['#F09EA7','#F6CA94',"#B3E0ED",'#CDABEB'],
    
    plotOptions: {
      bar: { 
      
        horizontal: false,
        columnWidth: '30%',
        distributed: true,
        dataLabels: {
          position: 'top' 
  
        
        }, 
      }
    },

  };
  readonly APIUrl = "http://localhost:3000";
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>("assets/data.json").subscribe(response => {
      if (response.api_status) {
        this.jsonData = response.data;
      }
    });
  }
  fetchChartData(questionId: number) {
    const question = this.jsonData.find(q => q.question_id === questionId);
  
    if (question) {
      

      const chartData = question.choices.map(choice => choice.choice_count);
  
      const xAxisLabels = question.choices.map(choice => choice.choice_text);
      
      this.chartOptions.series =[{
        name: 'Count', 
        data:chartData,
        
      }] ;
      this.chartOptions.xaxis = {
        categories: xAxisLabels
      };
    } 
  }
  
  shouldScrollTable() {
   
    return this.jsonData.some(question => question.choices.length > 8);
  }
  
}
