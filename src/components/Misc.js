import { ImSpinner9 } from 'react-icons/im';

export const Loader = () => {
    return (<div
        className='shadow'
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "200"
        }}>
        <div style={{
            backgroundColor: "#C40667",
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(100deg)"
        }}>
            <ImSpinner9 className='fa-spin' style={{ fontSize: 100, color: "#FFF", }} />
        </div>
    </div>)
}