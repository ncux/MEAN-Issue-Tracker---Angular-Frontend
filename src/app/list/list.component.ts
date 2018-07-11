import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { IssueService } from "../issue.service";
import { IssueInterface } from "../Issue.Interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: IssueInterface[] = [];
  displayedTableColumns = ['dated', 'title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.getIssues();
  }


  getIssues() {
    this.issueService.getAllIssues().subscribe((issues: IssueInterface[]) => {
      console.log(issues);
      this.issues = issues;
    });
  }


  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }


  deleteIssue(id) {
    this.issueService.deleteAnIssue(id).subscribe(() => this.ngOnInit());
  }

}
