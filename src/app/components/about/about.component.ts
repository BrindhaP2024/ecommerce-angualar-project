import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  teamImage = 'https://th.bing.com/th/id/OIP.ai74hU8_xquB2Rhn4mZ5qAHaEm?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  journeyImage = 'https://th.bing.com/th/id/OIP.LLmBb1FYjjw2dLKKHNK4rgHaEz?w=282&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  showcaseImage = "https://image.slidesdocs.com/responsive-images/background/mobile-phone-and-accessory-shop-in-3d-rendered-design-store-powerpoint-background_0f55135b63__960_540.jpg"
  // showcaseImage = 'https://th.bing.com/th/id/R.ce6fb47cda8a64548b7662e09ca1e538?rik=eCCE%2f%2f1ELK5c3g&riu=http%3a%2f%2fmandssteelbuildings.com%2fimg%2fpics%2fimg-12.jpg&ehk=51czsZm8nwjX8Jw9ONDxeW5iyZL3vgiNY8B%2fsJyUOPg%3d&risl=&pid=ImgRaw&r=0';
  communityImage = 'https://th.bing.com/th/id/OIP.FZZwTmNPJ30M2IMzMROSKAHaDY?w=291&h=159&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  familyImage = 'https://thumbs.dreamstime.com/b/shopping-line-online-store-website-mobile-application-d-rendering-background-digital-marketing-shop-concept-180462966.jpg';
}
