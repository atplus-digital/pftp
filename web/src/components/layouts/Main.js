import Container from "./Container"

function Main({customClass, children}){
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <Container customClass="container mx-auto px-6 py-8"  >
                {children}
            </Container>
        </main>
        )
}

export default Main