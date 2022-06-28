import { Component } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component {

  public labels1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public data1= [ 750, 250, 100 ];

}
