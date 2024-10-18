import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RowService } from './row.service';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('rows')
@Controller('rows')
export class RowController {
    constructor(private readonly rowService: RowService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Row created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    create(@Body('content') @Param('row') content: string) {
        return this.rowService.saveRow(content);
    }

    @Put(':id')
    @ApiParam({ name: 'id', required: true, description: 'ID of the row to update', type: Number })
    @ApiBody({
        description: 'Content to update the row with',
        type: String,
        required: true,
    })
    @ApiResponse({ status: 200, description: 'Row updated successfully.' })
    @ApiResponse({ status: 404, description: 'Row not found.' })
    async update(
        @Param('id') id: string,
        @Body('content') content: string
    ) {
        await this.rowService.updateRow(+id, content);
        return { message: `Row id:${id} updated successfully`, newContent: `${content}` };
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Row deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Row not found.' })
    async remove(@Param('id') id: string) {
        await this.rowService.deleteRow(+id);
        return { message: `Row id:${id} deleted successfully` };
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Returns all rows.' })
    findAll() {
        return this.rowService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Returns a row by ID.' })
    @ApiResponse({ status: 404, description: 'Row not found.' })
    findOne(@Param('id') id: string) {
        return this.rowService.findOne(+id);
    }
}
