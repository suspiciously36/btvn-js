//Phone number regex

export const regexPhoneNumber = (phone) => {
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  return phone.match(regexPhoneNumber) ? true : false;
};

//URL regex

export const regexURL = (url) => {
  const regexURL =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  return url.match(regexURL) ? true : false;
};

//Mail regex

export const regexMail = (mail) => {
  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return mail.match(regexMail) ? true : false;
};

//
