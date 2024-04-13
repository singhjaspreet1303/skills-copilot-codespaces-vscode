function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'app/members/skills-member.html',
    scope: {
      member: '='
    }
  };
}