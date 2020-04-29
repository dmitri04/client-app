import { Component, OnInit } from '@angular/core';
import {Persona} from './persona'
import {PersonaService} from './persona.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

   persona: Persona = new Persona()
   titulo:string = "Crear Persona"

  constructor(private personaService: PersonaService,
  private router: Router,
private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarPersona()
  }

  cargarPersona(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.personaService.getPersona(id).subscribe( (persona) => this.persona = persona)
      }
    })
  }

  create(): void {
    this.personaService.create(this.persona)
      .subscribe(persona => {
        this.router.navigate(['/personas'])
        swal('Nueva persona', `Persona ${persona.nombre} creado con éxito!`, 'success')
      }
      );
  }

  update():void{
    this.personaService.update(this.persona)
    .subscribe( persona => {
      this.router.navigate(['/personas'])
      swal('Persona Actualizado', `Cliente ${persona.nombre} actualizado con éxito!`, 'success')
    }

    )
  }

}
