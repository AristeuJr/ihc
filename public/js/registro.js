function toggleRestauranteFields() {
    const perfil = document.getElementById('perfil').value;
    const restauranteFields = document.getElementById('restaurante-fields');
    const restauranteRequiredFields = restauranteFields.querySelectorAll('#cpf_cnpj, #cep');
    const isRestaurante = perfil === 'Restaurante';

    restauranteFields.classList.toggle('hidden', !isRestaurante);
    restauranteRequiredFields.forEach((field) => {
        field.required = isRestaurante;
    });
}

function onlyNumbers(value, maxLength) {
    return value.replace(/\D/g, '').slice(0, maxLength);
}

function formatTelefone(value) {
    const numbers = onlyNumbers(value, 11);

    if (numbers.length <= 2) {
        return numbers ? `(${numbers}` : '';
    }

    if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

function formatCpfCnpj(value) {
    const numbers = onlyNumbers(value, 14);

    if (numbers.length <= 11) {
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
        if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
    }

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`;
}

function formatCep(value) {
    const numbers = onlyNumbers(value, 8);

    if (numbers.length <= 5) {
        return numbers;
    }

    return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
}

function applyMask(inputId, formatter) {
    const input = document.getElementById(inputId);

    input.addEventListener('input', () => {
        input.value = formatter(input.value);
    });
}

function validaCadastro(event) {
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma_senha').value;

    if (senha !== confirmaSenha) {
        event.preventDefault();
        alert('As senhas não coincidem!');
    }
}

const cadastroForm = document.getElementById('cadastro-form');
const perfilSelect = document.getElementById('perfil');

cadastroForm.addEventListener('submit', validaCadastro);
perfilSelect.addEventListener('change', toggleRestauranteFields);

toggleRestauranteFields();
applyMask('telefone', formatTelefone);
applyMask('cpf_cnpj', formatCpfCnpj);
applyMask('cep', formatCep);
