export const formatDate = (date) =>{
    return date.toLocaleDateString("en-US",{
        month:"short",
        day:"numeric",
        year:"numeric"
    })
}

export const getAuthHeader = () => {
  const creds = JSON.parse(localStorage.getItem('authUser') || '{}');
  return `Basic ${btoa(`${creds.username}:${creds.password}`)}`;
}