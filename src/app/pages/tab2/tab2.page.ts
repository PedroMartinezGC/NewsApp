import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article, NewsResponse } from '../../interfaces/index';
import { PopoverService } from '../../services/popover.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [NewsService]
})
export class Tab2Page implements OnInit{

  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  public selectedCategory : string = this.categories[0];
  public articles         : Article[] = [];
  public page             : number = 1;

  public selectedCountry  : any = {
    id: 'us',
    path: 'assets/icon-flags/us.svg'
  }

  constructor(private newsSrv: NewsService,
              private popoverSrv: PopoverService) {

  }

  ngOnInit(): void {
    this.takeHeadlines();
  }

  takeHeadlines(){
    this.newsSrv.getTopHeadlinesByCategory(this.selectedCategory, this.page, this.selectedCountry.id).subscribe(response=>{

      this.articles.splice(0, this.articles.length);    //when each category is selected, the articles of the previous are deleted
      this.page = 1;                                    //the initial page is the page 1 each time we change the category

      this.articles.push(...response.articles);

      console.log(this.articles);
    });
  }

  segmentChanged(event: any){
    this.selectedCategory = event.detail.value;

    console.log(this.selectedCategory);

    this.takeHeadlines();
  }

  loadData(event: any){

    this.page = this.page + 1;      //we load another page

    this.newsSrv.getTopHeadlinesByCategory(this.selectedCategory, this.page, this.selectedCountry.id).subscribe((response: NewsResponse)=>{
      
      if(this.articles.length == response.totalResults){
        
        event.target.disabled = true;
      }

      this.articles.push(...response.articles);
    });

    console.log('load more data');

    setTimeout(()=>{
      event.target.complete();
    }, 3000);
  }

  async selectCountry(event: any){

    this.selectedCountry = await this.popoverSrv.countriesSelection(event);

    if( (this.selectedCountry.path != undefined) || (this.selectedCountry.id != undefined)){
      
      this.articles = [];
      
      this.newsSrv.getTopHeadlinesByCategory(this.selectedCategory, this.page, this.selectedCountry.id).subscribe((response: NewsResponse)=>{
        
        this.articles.push(...response.articles);
      });
    }  
  }

}
