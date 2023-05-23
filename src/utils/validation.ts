// check whether user is in the user list
export const checkUser = (username: string, userData: UserData[]) : UserData | undefined => {
    const user = userData.find((user) => user.username === username);
    return user;
}

// check whether user is in the user profile list
export const checkUserProfile = (uid: string, userProfiles: UserProfile[]) : UserProfile | undefined => {
    const userProfile = userProfiles.find((userProfile) => userProfile.userUid === uid);
    return userProfile;
}