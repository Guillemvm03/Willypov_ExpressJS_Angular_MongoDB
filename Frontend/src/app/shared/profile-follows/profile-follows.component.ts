import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, Profile, ProfilesService } from '../../core'

@Component({
  selector: 'app-profile-followers',
  templateUrl: './profile-follows.component.html',
  styleUrls: ['./profile-follows.component.css']
})
export class ProfileFollowsComponent implements OnInit {

  profile!: Profile;
  follows: Profile[] = [];
  following: Profile[] = [];

  constructor(
    private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
   
    this.route.data.subscribe(
      (data:any) => {
        this.profile = data.profile;
        this.getFollowing();
        this.getFollowers();
      });

    
  }

  getFollowing() {
    this.profilesService.getFollowing(this.profile.username).subscribe(
      (data:any) => {
      
        this.following = data.users;
        console.log(this.following);
      }
    )
  }

  getFollowers() {
    this.profilesService.getFollow(this.profile.username).subscribe(
      (data:any) => {
        
        this.follows = data.users;
        console.log(this.follows);
      }
    )
  }


  onToggleFollowing(following: boolean) {
    this.profile.following = following;
    location.reload();
  }
}