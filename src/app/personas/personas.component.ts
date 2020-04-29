import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent implements OnInit {

  personas: Persona[];

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.personaService.getPersonas().subscribe(
      personas => this.personas = personas
    );
  }

  delete(persona: Persona): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al persona ${persona.nombre} ${persona.paterno} ${persona.materno}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.personaService.delete(persona.id).subscribe(
          response => {
            this.personas = this.personas.filter(cli => cli !== persona)
            swal(
              'Persona Eliminado!',
              `Persona ${persona.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
