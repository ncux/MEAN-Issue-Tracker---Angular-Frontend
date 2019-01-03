import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { IssueService } from "../issue.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private snack: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({title: ['', Validators.required], responsible: '', description: '', severity: '', status: ''});
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.id  = params.id);
    this.issueService.getOneIssue(this.id).subscribe(issue => {
      this.issue = issue;
      this.updateForm.get('title').setValue(this.issue.title);
      this.updateForm.get('responsible').setValue(this.issue.responsible);
      this.updateForm.get('description').setValue(this.issue.description);
      this.updateForm.get('severity').setValue(this.issue.severity);
      this.updateForm.get('status').setValue(this.issue.status);
    });
  }

  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateAnIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snack.open('Issue successfully updated!', 'OK', {duration: 3000});
      this.router.navigate(['/list']);
    });
  }
}
