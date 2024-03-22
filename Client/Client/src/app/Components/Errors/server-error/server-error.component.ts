import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [MatCardModule,RouterLink],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent implements OnInit {


  error: any;

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.error = this.route.snapshot.paramMap.get('error');
  }
}
