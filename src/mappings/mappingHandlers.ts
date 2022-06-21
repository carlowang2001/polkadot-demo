import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Transfer} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [from, to, amount, account, balance]}} = event;
    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.block_number = event.block.block.header.number.toBigInt();
    transfer.from_account = from.toString();
    transfer.to_account = to.toString();
    transfer.balance_change = (amount as Balance).toBigInt();
    transfer.timestamp = event.block.timestamp;
    await transfer.save();
}


