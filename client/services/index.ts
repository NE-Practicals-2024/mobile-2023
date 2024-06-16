import api from "@/api"
import { IToken, ITokenInfo, PurchaseTokenInputs } from "@/types"
import { UseFormReset } from "react-hook-form"
import { ToastType } from "react-native-toast-notifications"

export const purchaseToken = async ({
    amount,
    meter,
    setLoading,
    toast,
    reset,
}: {
    amount: string,
    meter: string,
    toast?: ToastType
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    reset: UseFormReset<PurchaseTokenInputs>
}) => {
    try {
        setLoading(true)
        const url = "/token/purchase"
        await api.post(url, { amount, meter })
        return toast?.show("Token created successfully", {
            type: "success",
            placement: "top"
        })
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error purchasing token", {
            type: "error",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const validateToken = async ({
    token,
    setLoading,
    toast,
    setTokenInfo
}: {
    token: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    toast?: ToastType,
    setTokenInfo: React.Dispatch<React.SetStateAction<ITokenInfo>>
}) => {
    try {
        setLoading(true)
        const url = `/token/validate/${token}`
        const response = await api.get(url)
        setTokenInfo(response.data.data.info)
        return toast?.show(response.data.message, {
            type: "success",
            placement: "top"
        })
    } catch (error: any) {
        console.log(error);
        return toast?.show(error.response.data.message ? error.response.data.message : "Error validating token", {
            type: "error",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const fetchTokensByMeter = async ({
    meter,
    setLoading,
    toast,
    setTokens
}: {
    meter: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    toast?: ToastType,
    setTokens: React.Dispatch<React.SetStateAction<IToken[]>>
}) => {
    try {
        setLoading(true)
        const url = `/token/by-meter-number/${meter}`
        const response = await api.get(url)
        setTokens(response.data.data.tokens)
        return toast?.show(response.data.message, {
            type: "success",
            placement: "top"
        })
    } catch (error: any) {
        console.log(error);
        return toast?.show(error.response.data.message ? error.response.data.message : "Error validating token", {
            type: "error",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}