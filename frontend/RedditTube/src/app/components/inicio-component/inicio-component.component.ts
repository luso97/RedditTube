import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { YoutubeService } from 'src/app/services/youtube.service';
import { LinksService } from 'src/app/services/links.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.scss']
})
export class InicioComponentComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private youtubeService: YoutubeService,
    private linkService: LinksService,
    private router: Router
  ) { }

  subreddit: boolean =true
  urlVideo
  top: boolean = false;
  formRedd:FormGroup;
  ngOnInit(): void {
    this.formRedd = this.formBuilder.group({
      subreddit: ['',Validators.required],
      type:[''],
      time:['']
    })
    console.log("iyo");
    this.formRedd.get('type').valueChanges.subscribe((value)=>{
      if(value=="top"){
        this.top = true;
      }else{
        this.top=false;
      }
    })
  }
  submit(){
    console.log(this.formRedd.value);
    var data=this.formRedd.value;
    this.linkService.find(data).subscribe((response)=>{
      console.log(response);
      var resArr = response as Array<string>;
      var url='https://www.youtube.com/watch_videos?video_ids=';
      resArr.forEach((res=>{
        url=url+res+",";
      }))
      this.urlVideo = url.substr(0,url.length-1);
    })
  }
  connectToTube(){
    this.router.navigateByUrl(this.urlVideo);
  }

}
