import React, { useState, useEffect } from 'react';
import { Text, Wrap, Input, WrapItem, Stack, RadioGroup, Radio, Button, Badge } from '@chakra-ui/react'
import
{
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import _ from 'lodash'
import api from '../../services/api'
import moment from 'moment'
import { DeleteIcon, NotAllowedIcon } from '@chakra-ui/icons'
import Navbar from '../../components/Navbar'

const Home = () =>
{
    const [type, setType] = useState("cpf")
    const [number, setNumber] = useState()
    const [result, setResult] = useState()
    const [list, setList] = useState([])
    const [blocklist, setBlocklist] = useState([])
    const [typeList, setTypeList] = useState(true)

    useEffect(() =>
    {
        loadAll()
        setTimeout(() =>
        {
            setResult()
        }, 10000)
    }, [result])

    const loadHistoric = async () =>
    {
        try {
            const res = await api.listAll()
            setList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const loadAll = async () =>
    {
        loadHistoric()
        loadBlocklist()
    }

    const loadBlocklist = async () =>
    {
        try {
            const res = await api.getBlocklist()
            setBlocklist(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async () =>
    {
        try {
            let data = { number, type }
            const res = await api.validate(data)
            setResult(res.data)

            console.log('res', res)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) =>
    {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveBlocklist = async (id, data) =>
    {

    }

    return (
        <div>
            <Navbar />

            <Stack justify="center" align="center" p="10px" >
                <Wrap p="20px" >
                    <Text fontSize="xl" color="black" fontWeight="bold">
                        Consultar
                    </Text>
                </Wrap>
                <Wrap align="center" justify="center"  >
                    <WrapItem>
                        <RadioGroup onChange={setType} value={type}>
                            <Radio defaultValue={"cpf"} p="0px 10px" value="cpf">CPF</Radio>
                            <Radio p="0px 10px" value="cnpj">CNPJ</Radio>
                        </RadioGroup>
                    </WrapItem>
                    <WrapItem>
                        <Input
                            onChange={(e) => setNumber(e.target.value)}
                            type="number"
                            variant='outline'
                            placeholder={`Digite aqui o ${type}`} />
                    </WrapItem>
                    <WrapItem>
                        <Button onClick={() => handleSave()}>Pesquisar</Button>
                    </WrapItem>
                    {result &&
                        <WrapItem>
                            <Badge p="3" variant="solid" colorScheme={result?.includes("Verdadeiro") ? "green" : "red"}>
                                {result}
                            </Badge>
                        </WrapItem>}
                </Wrap>

                <Wrap>
                    <Button onClick={() => setTypeList(!typeList)}>{typeList ? 'Ver histórico de consultas' : 'Ver lista de bloqueados'}</Button>
                </Wrap>
                <Wrap pt="10px">
                    <TableContainer>
                        <Table variant='striped' colorScheme='pink'>
                            {/* <TableCaption>Histórico de consultas</TableCaption> */}
                            <TableCaption>
                                {typeList ? 'Ver histórico de consultas' : 'Ver lista de bloqueados'}</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Data</Th>
                                    <Th>Cpf/Cnpj</Th>
                                    <Th>Status</Th>
                                    <Th>Ações</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* {_.map(list, elem => */}
                                {_.map(typeList ? list : blocklist, elem =>
                                {
                                    return (
                                        <Tr>
                                            <Td>{moment(elem.createdAt).format("LLL")}</Td>
                                            <Td isNumeric>{elem.number}</Td>
                                            <Td isNumeric>{elem.isValid ? "Válido" : "Inválido"}</Td>
                                            <Td isNumeric>
                                                <Button m="0px 1px"><NotAllowedIcon /></Button>
                                                <Button m="0px 1px"><DeleteIcon /></Button>
                                            </Td>
                                        </Tr>)
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>


                </Wrap>
            </Stack>
        </div>
    )
}

export default Home;