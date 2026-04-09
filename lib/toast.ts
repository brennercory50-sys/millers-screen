import { toast } from 'sonner'

export function toastSuccess(message: string) {
  toast.success(message)
}

export function toastError(message: string) {
  toast.error(message)
}

export function toastLoading(message: string) {
  return toast.loading(message)
}

export function toastPromise<T>(
  promise: Promise<T>,
  loadingMessage: string,
  successMessage: string,
  errorMessage: string = 'Something went wrong'
): Promise<T> {
  return toast.promise(promise, {
    loading: loadingMessage,
    success: successMessage,
    error: errorMessage,
  })
}
