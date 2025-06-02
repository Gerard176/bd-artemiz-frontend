import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObrasService } from '../../core/services/obras/obras.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-obra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-obra.component.html',
  styleUrl: './detalle-obra.component.css'
})
export class DetalleObraComponent implements OnInit {
  obra: any;

  constructor(private route: ActivatedRoute, private obrasService: ObrasService) {}

 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id')?.trim();
  if (id) {
    this.obrasService.getObraPorId(id).subscribe({
      next: data => this.obra = data,
      error: err => console.error(err)
    });
  }
}
}
