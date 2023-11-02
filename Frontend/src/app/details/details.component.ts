import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product, User, UserService, CommentsService ,Comment as Comments } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

    product!: Product;
    currentUser!: User;
    canModify!: boolean;

    slug!: string | null;
    comments!: Comments[];
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;
    isDeleting = false;
    user_image!: string | null;


    listProducts: Product[] = [];
    // isUser!: boolean;

    constructor(
        private userService: UserService,
        private commentsService: CommentsService,
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
        this.get_product();
        this.get_user_author();
        this.get_related();
              
    }

    get_related(): void {
        if (typeof this.slug === 'string') {
            this.ProductService.get_related(this.slug).subscribe({
                next: (data: any) => {
                    this.listProducts = data.products;
                },
                error: e => { 
                    // this.ToastrService.error("Product not found");
                    console.log(e);
                }
            })
        }
        console.log(this.listProducts);
      }




    get_product() {
        if (typeof this.slug === 'string') {
           this.ProductService.get_product(this.slug).subscribe({
                next: (data: any) => {
                    this.product = data.product;

                    this.get_comments();
                    this.get_user_author();
                    this.cd.markForCheck();
                },
                error: e => { 
                    // this.ToastrService.error("Product not found");
                    console.log(e);
                    this.router.navigate(['/']);
                }
            })
        }
    }

    
    onToggleFavorite(favorited: boolean) {
        this.product.liked = favorited;
    
        if (favorited) {
          console.log(this.product.likesCount);
          this.product.likesCount++;
      
        } else {
          console.log(this.product.likesCount);
          this.product.likesCount--;
      
        }
      }
    
      onToggleFollowing(following: boolean) {
        this.product.author.following = following;
        location.reload();
      }

      get_user_author() {
        this.userService.currentUser.subscribe((userData: User) => {
            this.currentUser = userData;
            this.user_image = userData.image;
            this.canModify = String(this.currentUser.username) === String(this.product.author?.username);
            console.log(this.canModify);
            this.cd.markForCheck();
            
        });
    }

    get_comments() {
      if (this.product.slug) {
          this.commentsService.get_all(this.product.slug).subscribe((comments:any) => {
              this.comments = comments.comments;
            //   console.log(this.comments);
              this.cd.markForCheck();
          });
      }
  }

  create_comment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    if (this.product.slug) {
        const commentBody = this.commentControl.value;
        this.commentsService.add(this.product.slug, commentBody).subscribe({
            next: data => {
                // this.ToastrService.success("Comment added successfully");
                this.commentControl.reset('');
                this.isSubmitting = false;
                this.cd.markForCheck();
                this.comments.push(data);
            },
            error: error => {
                // this.ToastrService.error("Comment add error");
                this.isSubmitting = false;
                this.commentFormErrors = error;
                this.cd.markForCheck();
            }
        })
    }
}

delete_comment(comment: Comments) {
  if (this.product.slug) {
      this.commentsService.destroy(this.product.slug,comment.id).subscribe({
          next: (data:any) => {
              console.log(data.type);
              if (data.type == 'success') {
                  // this.ToastrService.success("Comment deleted");
                  this.comments = this.comments.filter((item) => item !== comment);
                  this.cd.markForCheck();
              }
          },
          error: error => { 
              // this.ToastrService.error(error.msg);
          }
      })
  }
}

empty_comment() {
  this.commentControl.reset('');
  this.isSubmitting = false;
  this.cd.markForCheck();
}

}