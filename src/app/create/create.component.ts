import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService,  private router: Router, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({title: ['', Validators.required], responsible: '', description: '', severity: ''});
  }

  ngOnInit() {
  }

  addIssue(title, responsible, description, severity) {
    this.issueService.addAnIssue(title, responsible, description, severity).subscribe(() => this.router.navigate(['/list']));
  }

}
