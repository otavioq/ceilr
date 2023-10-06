import React from "react";
import router from "@/services/router";
import Btn from "@/components/Btn";

export default function Home() {
    return (
        <div>
            <h1>Hello world!</h1>
            <Btn
                onClick={() => router.navigate('/properties')}
            >butao</Btn>
        </div>
    )
}
