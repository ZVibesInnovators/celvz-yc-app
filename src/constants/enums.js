const Enums =  {
    BASE_URL: 'https://z-vibes-engine-prod.herokuapp.com/api/v1',
    URL_REGEX: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
    COLORS: {
        white: " #fff",
        orange: "#D3006C",
        yellow: "#f5ca04",
        grey_500: "#333",
        grey_400: "#555"
    },
    PERMISSIONS: {
        ADMIN_ACCOUNT_MANAGER: "ADMIN_ACCOUNT_MANAGER",
        CELL_MANAGER: "CELL_MANAGER",
        ZONE_MANEGER: "ZONE_MANEGER",
        PUBLISHER: "PUBLISHER",
        EDITOR: "EDITOR",
        MUSIC_MANAGER: "MUSIC_MANAGER",
        BACK_OFFICE_ACCESS: "BACK_OFFICE_ACCESS",
    }
}
export default Enums