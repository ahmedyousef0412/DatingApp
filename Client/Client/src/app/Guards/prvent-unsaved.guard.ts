import { CanDeactivateFn } from '@angular/router';
import { IDeactivateComponent } from '../Helper/IDeactivate';
import { MemberEditComponent } from '../Components/members/member-edit/member-edit.component';

export const prventUnsavedGuard: CanDeactivateFn<MemberEditComponent> = (component, currentRoute, currentState, nextState) => {
  
  if(component.editForm.dirty){
    return confirm("You have unsaved changes. Do you want to leave this page?");
  }
  return true;
};
